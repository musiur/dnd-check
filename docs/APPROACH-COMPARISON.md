# Drag & Drop Approach Comparison

## The Question

**"How do I drag between a sidebar (in root layout) and a Kanban board (3-4 layers deep in nested routes)?"**

## Approaches Evaluated

### ❌ Approach 1: Global DND-KIT Context

```typescript
// app/layout.tsx
export default function RootLayout({ children }) {
  return (
    <DndContext> {/* Wraps entire app */}
      <Sidebar />
      {children}
    </DndContext>
  );
}
```

**Pros:**
- Single context for everything
- DND-KIT features everywhere

**Cons:**
- ❌ Forces root layout to be client component
- ❌ Loses Next.js SSR benefits
- ❌ DND-KIT loads on every route
- ❌ Poor code splitting
- ❌ Performance overhead on non-DND pages
- ❌ Tight coupling across features
- ❌ Hard to test in isolation

**Verdict:** ❌ **Not recommended for production**

---

### ⚠️ Approach 2: Scoped DND-KIT Context

```typescript
// app/(workspace)/layout.tsx
export default function WorkspaceLayout({ children }) {
  return (
    <DndContext> {/* Scoped to workspace */}
      <Sidebar />
      {children}
    </DndContext>
  );
}
```

**Pros:**
- Better than global context
- Scoped to feature area
- Better code splitting

**Cons:**
- ⚠️ Still requires shared parent layout
- ⚠️ Doesn't work if sidebar and board are in different route groups
- ⚠️ Limited flexibility
- ⚠️ Requires careful route structure planning

**Verdict:** ⚠️ **Works but limited**

---

### ❌ Approach 3: Separate DND-KIT Contexts

```typescript
// Sidebar has its own context
<DndContext>
  <Sidebar />
</DndContext>

// Board has its own context
<DndContext>
  <KanbanBoard />
</DndContext>
```

**Pros:**
- Clean separation
- Independent features

**Cons:**
- ❌ **Cannot drag between contexts**
- ❌ Completely isolated
- ❌ Defeats the purpose

**Verdict:** ❌ **Doesn't solve the problem**

---

### ✅ Approach 4: Pure Native HTML5

```typescript
// Sidebar
<div draggable onDragStart={...} />

// Board (any depth)
<div onDrop={...} onDragOver={...} />
```

**Pros:**
- ✅ Works across ANY boundary
- ✅ Zero bundle size (built-in)
- ✅ No context needed
- ✅ Works with Server Components
- ✅ Simple to understand
- ✅ Browser-level performance

**Cons:**
- ❌ No animations
- ❌ No collision detection
- ❌ Clunky API
- ❌ No touch support
- ❌ Manual accessibility
- ❌ Browser inconsistencies

**Verdict:** ✅ **Works but basic UX**

---

### 🏆 Approach 5: Hybrid (Native + DND-KIT)

```typescript
// Sidebar (Native)
<div draggable onDragStart={...} />

// Board (Native + DND-KIT)
<div onDrop={...}> {/* Native for external */}
  <DndContext> {/* DND-KIT for internal */}
    <Droppable />
  </DndContext>
</div>

// Cards (Both)
<div
  draggable="true"        // Native
  {...dndKitListeners}    // DND-KIT
/>
```

**Pros:**
- ✅ Works across ANY boundary (native)
- ✅ Beautiful UX where it matters (DND-KIT)
- ✅ Scoped context (performance)
- ✅ Works with Server Components
- ✅ Best of both worlds
- ✅ Production-ready
- ✅ Scales to any complexity

**Cons:**
- ⚠️ Slightly more complex
- ⚠️ Need to understand both systems

**Verdict:** 🏆 **RECOMMENDED - Production ready**

---

## Feature Comparison Matrix

| Feature | Global DND-KIT | Scoped DND-KIT | Separate Contexts | Pure Native | Hybrid |
|---------|----------------|----------------|-------------------|-------------|--------|
| Cross-boundary drag | ✅ | ⚠️ Limited | ❌ | ✅ | ✅ |
| Animations | ✅ | ✅ | ✅ | ❌ | ✅ |
| Touch support | ✅ | ✅ | ✅ | ❌ | ✅ |
| Accessibility | ✅ | ✅ | ✅ | ⚠️ Manual | ✅ |
| Code splitting | ❌ | ⚠️ | ✅ | ✅ | ✅ |
| Performance | ❌ | ⚠️ | ✅ | ✅ | ✅ |
| Server Components | ❌ | ❌ | ⚠️ | ✅ | ✅ |
| Bundle size | ❌ Large | ⚠️ Medium | ✅ Small | ✅ Zero | ✅ Small |
| Complexity | ⚠️ Medium | ⚠️ Medium | ✅ Low | ✅ Low | ⚠️ Medium |
| Flexibility | ⚠️ Limited | ⚠️ Limited | ❌ None | ✅ High | ✅ High |
| Production ready | ❌ | ⚠️ | ❌ | ⚠️ | ✅ |

## Performance Comparison

### Bundle Size Impact

```
Global DND-KIT:     +50KB on every route
Scoped DND-KIT:     +50KB on workspace routes
Separate Contexts:  +50KB per context
Pure Native:        +0KB
Hybrid:            +50KB on Kanban routes only
```

### Runtime Performance

```
Global DND-KIT:     All drag events processed globally
Scoped DND-KIT:     Events scoped to workspace
Separate Contexts:  Events isolated per context
Pure Native:        Browser-level (C++ implementation)
Hybrid:            Native for cross-boundary (fast)
                   DND-KIT for internal (optimized)
```

## Real-World Scenarios

### Scenario 1: Simple App (1-2 routes)
**Best Choice:** Scoped DND-KIT
- Simple enough for single context
- Full DND-KIT features

### Scenario 2: Medium App (5-10 routes)
**Best Choice:** Hybrid
- Some routes need DND, others don't
- Better code splitting

### Scenario 3: Complex App (10+ routes, nested layouts)
**Best Choice:** Hybrid
- Maximum flexibility
- Works across any boundary
- Optimal performance

### Scenario 4: Sidebar in Root, Board Deep in Routes
**Best Choice:** Hybrid (our implementation)
- Native for cross-boundary
- DND-KIT for enhanced UX
- Scales to any depth

## Migration Path

### From Global DND-KIT → Hybrid

```typescript
// Before: Global context
<DndContext>
  <Sidebar />
  <Board />
</DndContext>

// After: Hybrid
<Sidebar /> {/* Native drag */}
<Board>
  <DndContext> {/* Scoped */}
    {/* Internal DND-KIT */}
  </DndContext>
</Board>
```

### From Pure Native → Hybrid

```typescript
// Before: All native
<div draggable onDragStart={...} />
<div onDrop={...} />

// After: Add DND-KIT where needed
<div draggable onDragStart={...} /> {/* Keep native */}
<DndContext> {/* Add for enhanced UX */}
  <div onDrop={...} /> {/* Keep native handler */}
</DndContext>
```

## Decision Tree

```
Do you need cross-layout dragging?
├─ No → Use scoped DND-KIT
└─ Yes
   ├─ Is UX critical?
   │  ├─ No → Use pure native
   │  └─ Yes → Use hybrid ✅
   └─ Can you share a parent layout?
      ├─ Yes → Consider scoped DND-KIT
      └─ No → Use hybrid ✅
```

## Recommendations by Use Case

### E-commerce Product Builder
- **Recommendation:** Hybrid
- **Why:** Drag from catalog (sidebar) to builder (deep route)

### Project Management (Trello-like)
- **Recommendation:** Hybrid
- **Why:** Drag from backlog to boards across routes

### File Manager
- **Recommendation:** Hybrid
- **Why:** Drag files between folders at any depth

### Form Builder
- **Recommendation:** Scoped DND-KIT
- **Why:** All in one route, full DND-KIT features

### Dashboard Widgets
- **Recommendation:** Scoped DND-KIT
- **Why:** Contained in dashboard route

### Multi-tenant App with Nested Routes
- **Recommendation:** Hybrid
- **Why:** Maximum flexibility across tenant routes

## Conclusion

For the specific question asked:

> "Sidebar in layout, Kanban board 3-4 layers deep in nested routes"

**Answer:** 🏆 **Hybrid Approach (Native + DND-KIT)**

This is the **only** approach that:
1. ✅ Works across any layout depth
2. ✅ Provides excellent UX
3. ✅ Maintains good performance
4. ✅ Scales to production
5. ✅ Works with Next.js Server Components

The implementation in this project demonstrates this pattern in production-ready code.
