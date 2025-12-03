# Testing Guide: Bidirectional Drag & Drop

## Test Environment Setup

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000)

## Test Cases

### ✅ Test 1: Sidebar → Kanban (Native HTML5)

**Steps:**
1. Locate "New Feature" card in the sidebar
2. Click and hold on the card
3. Drag it over the "To Do" column
4. Release the mouse button

**Expected Results:**
- ✅ Card should have a "grab" cursor on hover
- ✅ Card should become semi-transparent while dragging
- ✅ "To Do" column should highlight when hovering
- ✅ Card should appear in "To Do" column after drop
- ✅ Card should disappear from sidebar
- ✅ No console errors

**What's Being Tested:**
- Native HTML5 drag from sidebar
- Native drop on Kanban column
- Zustand state update
- UI re-render

---

### ✅ Test 2: Kanban → Sidebar (Native HTML5)

**Steps:**
1. Locate "Task 1" in the "To Do" column
2. Click and hold on the card
3. Drag it over the sidebar area
4. Release the mouse button

**Expected Results:**
- ✅ Card should have a "grab" cursor on hover
- ✅ Sidebar should highlight with blue tint when hovering
- ✅ Card should appear in sidebar after drop
- ✅ Card should disappear from "To Do" column
- ✅ No console errors

**What's Being Tested:**
- Native HTML5 drag from Kanban
- Native drop on sidebar
- Zustand state update
- Card removal from column

**⚠️ IMPORTANT:** This tests the hybrid approach - dragging FROM DND-KIT context TO native drop zone.

---

### ✅ Test 3: Reorder Within Column (DND-KIT)

**Steps:**
1. Locate "Task 1" in "To Do" column
2. Click and hold on the card
3. Drag it below "Task 2"
4. Release the mouse button

**Expected Results:**
- ✅ Card should have smooth animation
- ✅ Other cards should shift to make space
- ✅ Card order should change: Task 2, Task 1
- ✅ No flickering or jumping
- ✅ No console errors

**What's Being Tested:**
- DND-KIT sortable functionality
- Collision detection
- Animation system
- State update within same column

---

### ✅ Test 4: Move Between Columns (DND-KIT)

**Steps:**
1. Locate "Task 1" in "To Do" column
2. Click and hold on the card
3. Drag it over "In Progress" column
4. Release the mouse button

**Expected Results:**
- ✅ Card should have smooth animation
- ✅ "In Progress" column should show drop indicator
- ✅ Card should appear in "In Progress" column
- ✅ Card should disappear from "To Do" column
- ✅ Smooth transition animation
- ✅ No console errors

**What's Being Tested:**
- DND-KIT cross-column drag
- Collision detection between columns
- State update across columns

---

### ✅ Test 5: Rapid Drag Operations

**Steps:**
1. Drag "New Feature" from sidebar → "To Do"
2. Immediately drag it to "In Progress"
3. Immediately drag it back to sidebar
4. Repeat 3-4 times quickly

**Expected Results:**
- ✅ All operations should complete successfully
- ✅ No state corruption
- ✅ No duplicate cards
- ✅ No lost cards
- ✅ UI stays in sync with state
- ✅ No console errors

**What's Being Tested:**
- State management under rapid changes
- Race condition handling
- Zustand state consistency

---

### ✅ Test 6: Edge Cases

#### 6a. Drag and Cancel (ESC key)
**Steps:**
1. Start dragging a card
2. Press ESC key before dropping

**Expected:**
- ✅ Drag should cancel
- ✅ Card returns to original position
- ✅ No state change

#### 6b. Drag Outside Window
**Steps:**
1. Start dragging a card
2. Move cursor outside browser window
3. Release mouse button

**Expected:**
- ✅ Drag should cancel
- ✅ Card returns to original position
- ✅ No state change

#### 6c. Drag to Invalid Zone
**Steps:**
1. Start dragging a card
2. Try to drop on the header or empty space

**Expected:**
- ✅ Cursor shows "no-drop" icon
- ✅ Card returns to original position
- ✅ No state change

---

## Browser Compatibility Tests

### Chrome/Edge
- [ ] All test cases pass
- [ ] Smooth animations
- [ ] No visual glitches

### Firefox
- [ ] All test cases pass
- [ ] Drag image appears correctly
- [ ] No visual glitches

### Safari
- [ ] All test cases pass
- [ ] Native drag works
- [ ] No visual glitches

---

## Performance Tests

### Test 7: Many Cards

**Setup:**
1. Add 20+ cards to sidebar (modify `lib/store.ts`)
2. Add 10+ cards to each column

**Test:**
1. Drag cards between all zones
2. Reorder multiple cards
3. Monitor browser DevTools Performance tab

**Expected:**
- ✅ No lag during drag
- ✅ Smooth 60fps animations
- ✅ No memory leaks
- ✅ Fast state updates (<16ms)

---

## Debugging Tests

### Test 8: Console Monitoring

**Steps:**
1. Open browser DevTools Console
2. Perform all test cases above
3. Monitor for errors/warnings

**Expected:**
- ✅ No errors
- ✅ No warnings
- ✅ No React hydration errors
- ✅ No DND-KIT warnings

### Test 9: React DevTools

**Steps:**
1. Install React DevTools extension
2. Open Components tab
3. Perform drag operations
4. Monitor component re-renders

**Expected:**
- ✅ Only affected components re-render
- ✅ No unnecessary re-renders
- ✅ State updates are atomic

---

## Known Limitations

### ❌ Mobile Touch
- Native HTML5 drag doesn't work on touch devices
- Would need touch polyfill (e.g., `@dnd-kit/touch`)
- DND-KIT within Kanban works on touch

### ⚠️ Drag Image Customization
- Native drag image is limited
- Can't fully customize appearance
- Browser-dependent rendering

### ⚠️ Keyboard Navigation
- No keyboard support for native drag
- DND-KIT has keyboard support within Kanban
- Would need custom implementation

---

## Automated Testing (Future)

### Unit Tests
```typescript
// Example test structure
describe('Kanban Store', () => {
  it('should add task to column', () => {
    const task = { id: '1', title: 'Test', description: 'Test' };
    addTaskToColumn(task, 'todo');
    expect(columns[0].tasks).toContain(task);
  });
  
  it('should remove task from sidebar', () => {
    removeTaskFromSidebar('sidebar-1');
    expect(sidebarTasks).not.toContain('sidebar-1');
  });
});
```

### Integration Tests
```typescript
// Example with Testing Library
describe('Drag and Drop', () => {
  it('should drag from sidebar to kanban', async () => {
    const { getByText } = render(<App />);
    const card = getByText('New Feature');
    const column = getByText('To Do');
    
    // Simulate drag
    fireEvent.dragStart(card);
    fireEvent.drop(column);
    
    expect(column).toContainElement(card);
  });
});
```

### E2E Tests
```typescript
// Example with Playwright
test('bidirectional drag', async ({ page }) => {
  await page.goto('http://localhost:3000');
  
  // Drag from sidebar to kanban
  await page.dragAndDrop('[data-testid="sidebar-card-1"]', '[data-testid="column-todo"]');
  
  // Verify
  await expect(page.locator('[data-testid="column-todo"]')).toContainText('New Feature');
});
```

---

## Test Results Template

```
Date: ___________
Browser: ___________
OS: ___________

Test 1 (Sidebar → Kanban):     [ ] Pass  [ ] Fail
Test 2 (Kanban → Sidebar):     [ ] Pass  [ ] Fail
Test 3 (Reorder Within):       [ ] Pass  [ ] Fail
Test 4 (Move Between):         [ ] Pass  [ ] Fail
Test 5 (Rapid Operations):     [ ] Pass  [ ] Fail
Test 6 (Edge Cases):           [ ] Pass  [ ] Fail
Test 7 (Performance):          [ ] Pass  [ ] Fail
Test 8 (Console):              [ ] Pass  [ ] Fail
Test 9 (React DevTools):       [ ] Pass  [ ] Fail

Notes:
_________________________________
_________________________________
_________________________________
```

---

## Troubleshooting

### Issue: Cards not dragging from Kanban to Sidebar

**Possible Causes:**
1. Native `draggable="true"` not set on card
2. `onDragStart` handler not firing
3. DND-KIT sensor capturing the drag

**Solutions:**
1. Verify `draggable="true"` in `kanban-card.tsx`
2. Check `handleNativeDragStart` is attached
3. Adjust `PointerSensor` activation constraint

### Issue: Sidebar not accepting drops

**Possible Causes:**
1. `onDragOver` not calling `e.preventDefault()`
2. `onDrop` handler not attached
3. Source check failing

**Solutions:**
1. Verify `e.preventDefault()` in `handleDragOver`
2. Check `onDrop` handler is attached to sidebar div
3. Verify `source === "kanban"` check

### Issue: State not updating

**Possible Causes:**
1. Zustand action not called
2. State mutation instead of immutable update
3. Component not subscribed to store

**Solutions:**
1. Add console.log in Zustand actions
2. Verify spread operators used correctly
3. Check `useKanbanStore()` hook usage

---

## Success Criteria

All tests must pass for production readiness:

- [x] Sidebar → Kanban works
- [x] Kanban → Sidebar works
- [x] Reordering within columns works
- [x] Moving between columns works
- [x] No console errors
- [x] Smooth animations
- [x] State stays consistent
- [x] Works in Chrome/Firefox/Safari
- [x] Good performance with many cards

---

**Happy Testing! 🧪**
