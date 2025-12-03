# Test Guide: Bidirectional Drag & Drop

## Complete Test Checklist

### ✅ Test 1: Sidebar → Kanban (Native HTML5)

**Steps:**
1. Start dev server: `pnpm dev`
2. Locate "New Feature" card in the sidebar
3. Click and hold on the card
4. Drag it over the "To Do" column
5. Release the mouse

**Expected Results:**
- ✅ Card becomes semi-transparent while dragging
- ✅ Cursor changes to "move" icon
- ✅ "To Do" column highlights when hovering
- ✅ Card appears in "To Do" column after drop
- ✅ Card disappears from sidebar
- ✅ No console errors

**Technical Details:**
- Uses: Native HTML5 `draggable` + `onDragStart`
- Data transfer: `source: "sidebar"`
- Handler: `kanban-column.tsx` → `handleNativeDrop()`

---

### ✅ Test 2: Kanban → Sidebar (Native HTML5)

**Steps:**
1. Locate "Task 1" in the "To Do" column
2. Click and hold on the card
3. Drag it over the sidebar area (left side)
4. Release the mouse

**Expected Results:**
- ✅ Card becomes semi-transparent while dragging
- ✅ Cursor changes to "move" icon
- ✅ Sidebar background highlights (light blue/primary color)
- ✅ Card appears in sidebar after drop
- ✅ Card disappears from "To Do" column
- ✅ No console errors

**Technical Details:**
- Uses: Native HTML5 `draggable="true"` on card
- Data transfer: `source: "kanban"`
- Handler: `sidebar.tsx` → `handleDrop()`
- **This is the key test for Kanban → Sidebar!**

---

### ✅ Test 3: Reorder Within Column (DND-KIT)

**Steps:**
1. Locate "Task 1" in "To Do" column
2. Click and hold on the card
3. Drag it below "Task 2"
4. Release the mouse

**Expected Results:**
- ✅ Card becomes semi-transparent while dragging
- ✅ Other cards shift to make space
- ✅ Smooth animation when dropping
- ✅ Cards swap positions
- ✅ Order is maintained after drop

**Technical Details:**
- Uses: DND-KIT `useSortable` hook
- Handler: `kanban-board.tsx` → `handleDragOver()` → `reorderTasksInColumn()`

---

### ✅ Test 4: Move Between Columns (DND-KIT)

**Steps:**
1. Locate "Task 1" in "To Do" column
2. Click and hold on the card
3. Drag it over "In Progress" column
4. Release the mouse

**Expected Results:**
- ✅ Card becomes semi-transparent while dragging
- ✅ Target column highlights
- ✅ Smooth animation when dropping
- ✅ Card appears in "In Progress" column
- ✅ Card disappears from "To Do" column

**Technical Details:**
- Uses: DND-KIT `useSortable` + `useDroppable`
- Handler: `kanban-board.tsx` → `handleDragOver()` → `moveTask()`

---

## Visual Feedback Checklist

### Cursor States
- [ ] **Hover over card**: Cursor changes to grab (✋)
- [ ] **Dragging card**: Cursor changes to grabbing (✊)
- [ ] **Over valid drop zone**: Cursor shows move (↓)
- [ ] **Over invalid area**: Cursor shows no-drop (🚫)

### Highlighting
- [ ] **Sidebar hover (from Kanban)**: Background changes to light blue
- [ ] **Column hover (from Sidebar)**: Column area highlights
- [ ] **Card dragging**: Card becomes semi-transparent (opacity: 0.5)

### Animations
- [ ] **Reorder within column**: Smooth slide animation
- [ ] **Move between columns**: Smooth transition
- [ ] **Card hover**: Slight scale up (1.02x)
- [ ] **Card hover**: Shadow increases

---

## Edge Cases to Test

### Test 5: Drag All Cards to Board
**Steps:**
1. Drag all 4 sidebar cards to the board
2. Check sidebar state

**Expected:**
- ✅ Sidebar shows "All tasks on the board" message
- ✅ Sidebar shows "Drag cards back here to remove them" hint
- ✅ Sidebar still accepts drops (highlighted when hovering)

---

### Test 6: Drag All Cards Back to Sidebar
**Steps:**
1. After Test 5, drag all cards back to sidebar
2. Check board state

**Expected:**
- ✅ All cards return to sidebar
- ✅ Columns are empty
- ✅ No errors in console

---

### Test 7: Rapid Dragging
**Steps:**
1. Quickly drag multiple cards in succession
2. Don't wait for animations to complete

**Expected:**
- ✅ All operations complete correctly
- ✅ No duplicate cards
- ✅ No lost cards
- ✅ State remains consistent

---

### Test 8: Drag and Cancel
**Steps:**
1. Start dragging a card
2. Press ESC or drag outside window
3. Release mouse

**Expected:**
- ✅ Card returns to original position
- ✅ No state changes
- ✅ No errors

---

## Browser Compatibility Tests

### Chrome/Edge
- [ ] All drag operations work
- [ ] Visual feedback correct
- [ ] Animations smooth

### Firefox
- [ ] All drag operations work
- [ ] Visual feedback correct
- [ ] Animations smooth

### Safari
- [ ] All drag operations work
- [ ] Visual feedback correct
- [ ] Animations smooth

---

## Debugging Guide

### Issue: Cards Not Dragging

**Check:**
```typescript
// In kanban-card.tsx
draggable="true"  // Must be present
onDragStart={handleNativeDragStart}  // Must be attached
```

**Console Test:**
```javascript
// Open DevTools Console
document.querySelectorAll('[draggable="true"]').length
// Should return number of draggable cards
```

---

### Issue: Sidebar Not Accepting Drops

**Check:**
```typescript
// In sidebar.tsx
onDrop={handleDrop}  // Must be present
onDragOver={handleDragOver}  // Must call e.preventDefault()
```

**Console Test:**
```javascript
// While dragging from Kanban, check:
e.dataTransfer.getData("source")  // Should be "kanban"
```

---

### Issue: No Visual Feedback

**Check:**
```typescript
// In sidebar.tsx
const [isDragOver, setIsDragOver] = useState(false);
// Should toggle on dragOver/dragLeave
```

**DevTools Test:**
1. Drag card from Kanban to sidebar
2. Inspect sidebar element
3. Check if `bg-primary/10` class is applied

---

### Issue: State Not Updating

**Check Zustand Store:**
```javascript
// In browser console
window.__ZUSTAND_STORE__ = useKanbanStore.getState()
console.log(window.__ZUSTAND_STORE__)
```

**Or add debug logging:**
```typescript
// In sidebar.tsx handleDrop
console.log('Before:', sidebarTasks.length);
// ... update logic
console.log('After:', useKanbanStore.getState().sidebarTasks.length);
```

---

## Performance Tests

### Test 9: Many Cards
**Steps:**
1. Add 20+ cards to sidebar (modify `lib/store.ts`)
2. Drag multiple cards
3. Check performance

**Expected:**
- ✅ No lag during drag
- ✅ Smooth animations
- ✅ No memory leaks

---

### Test 10: Rapid State Changes
**Steps:**
1. Drag card from sidebar to column
2. Immediately drag it back
3. Repeat 10 times quickly

**Expected:**
- ✅ All operations complete
- ✅ No race conditions
- ✅ State remains consistent

---

## Specific Test: Kanban → Sidebar (The Missing Piece)

### Detailed Test Steps

1. **Setup:**
   ```bash
   pnpm dev
   # Open http://localhost:3000
   ```

2. **Verify Initial State:**
   - Sidebar has 4 cards: "New Feature", "Bug Fix", "Documentation", "Code Review"
   - "To Do" has: "Task 1", "Task 2"
   - "In Progress" has: "Task 3"
   - "Done" has: "Task 4", "Task 5"

3. **Perform Drag:**
   - Click and hold "Task 1" in "To Do" column
   - Drag mouse to the left over the sidebar
   - Sidebar should highlight with light blue background
   - Release mouse

4. **Verify Result:**
   - "Task 1" should now appear in sidebar
   - "To Do" column should only have "Task 2"
   - Sidebar should have 5 cards total

5. **Verify Data Transfer:**
   - Open DevTools Console
   - Add this to `sidebar.tsx` temporarily:
   ```typescript
   const handleDrop = (e: React.DragEvent) => {
     e.preventDefault();
     const source = e.dataTransfer.getData("source");
     console.log("Drop source:", source); // Should log "kanban"
     // ... rest of code
   };
   ```

6. **Verify State Update:**
   - Check React DevTools
   - Find `useKanbanStore` state
   - Verify `sidebarTasks` array increased
   - Verify `columns[0].tasks` array decreased

---

## Success Criteria

All tests must pass:
- ✅ Sidebar → Kanban works
- ✅ **Kanban → Sidebar works** ← Key test!
- ✅ Reorder within column works
- ✅ Move between columns works
- ✅ Visual feedback is correct
- ✅ No console errors
- ✅ State updates correctly
- ✅ Works in all major browsers

---

## Quick Verification Script

Run this in browser console after loading the app:

```javascript
// Test 1: Check draggable elements
const draggables = document.querySelectorAll('[draggable="true"]');
console.log(`✅ Found ${draggables.length} draggable elements`);

// Test 2: Check drop zones
const sidebar = document.querySelector('[class*="border-r"]');
console.log('✅ Sidebar found:', !!sidebar);

// Test 3: Check Zustand store
const store = window.useKanbanStore?.getState?.();
console.log('✅ Store state:', {
  sidebarTasks: store?.sidebarTasks?.length,
  columns: store?.columns?.length
});

// Test 4: Simulate drag (manual test required)
console.log('🧪 Manual test: Drag a card from Kanban to Sidebar');
```

---

## Video Recording Checklist

If recording a demo:

1. ✅ Show initial state
2. ✅ Drag from sidebar to board
3. ✅ Show card appears on board
4. ✅ Drag from board back to sidebar ← **Key demo!**
5. ✅ Show card returns to sidebar
6. ✅ Reorder within column
7. ✅ Move between columns
8. ✅ Show visual feedback (highlighting, cursors)
9. ✅ Show empty sidebar state
10. ✅ Show all cards back in sidebar

---

## Conclusion

The **Kanban → Sidebar** drag is fully implemented using:
- Native HTML5 `draggable="true"` on cards
- `onDragStart` setting `source: "kanban"`
- Sidebar's `onDrop` handler checking for `source === "kanban"`
- Zustand state update removing from columns, adding to sidebar

**It should work!** If it doesn't, follow the debugging guide above.
