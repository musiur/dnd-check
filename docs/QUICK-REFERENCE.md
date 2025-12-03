# Quick Reference Card

## 🚀 Start the App

```bash
pnpm dev
```

## 🎯 Drag Operations

| From | To | Technology | Works? |
|------|----|-----------:|:------:|
| Sidebar | Kanban | Native HTML5 | ✅ |
| Kanban | Sidebar | Native HTML5 | ✅ |
| Column | Same Column | DND-KIT | ✅ |
| Column | Other Column | DND-KIT | ✅ |

## 📁 Key Files

```
components/
├── sidebar.tsx          # Drag source + drop target
├── kanban-board.tsx     # DND-KIT context
├── kanban-column.tsx    # Column with drop zone
└── kanban-card.tsx      # Hybrid draggable card

lib/
└── store.ts             # Zustand state

app/
└── page.tsx             # Layout
```

## 🔧 Core Patterns

### Hybrid Card
```typescript
<div
  {...dndKitListeners}
  draggable="true"
  onDragStart={nativeHandler}
/>
```

### Drop Zone
```typescript
<div
  onDrop={handleDrop}
  onDragOver={(e) => e.preventDefault()}
/>
```

### State Update
```typescript
useKanbanStore.setState({ ... })
```

## 🐛 Debugging

### Check Console
```bash
# Should see no errors
console.log('🚀 Drag started')
console.log('📥 Drop received')
```

### Check State
```typescript
const { sidebarTasks, columns } = useKanbanStore();
console.log({ sidebarTasks, columns });
```

### Check Events
```typescript
onDragStart={(e) => {
  console.log('Data:', e.dataTransfer.getData('application/json'));
}}
```

## ⚡ Common Issues

### Cards Not Dragging
- Check `draggable="true"`
- Check `onDragStart` attached

### Drop Not Working
- Check `e.preventDefault()` in `onDragOver`
- Check `onDrop` handler attached

### State Not Updating
- Check Zustand action called
- Check immutable updates
- Check component subscribed

## 📚 Documentation

- `README.md` - Overview
- `QUICK-START.md` - Getting started
- `TESTING-GUIDE.md` - Test cases
- `KANBAN-TO-SIDEBAR-FIX.md` - Technical details
- `FINAL-IMPLEMENTATION-STATUS.md` - Status

## 🎓 Key Concepts

### Native HTML5
- Works everywhere
- Zero bundle size
- Browser-level performance

### DND-KIT
- Rich animations
- Collision detection
- Touch support

### Hybrid
- Native for cross-boundary
- DND-KIT for UX
- Best of both worlds

## ✅ Success Checklist

- [ ] Sidebar → Kanban works
- [ ] Kanban → Sidebar works
- [ ] Reordering works
- [ ] Moving between columns works
- [ ] No console errors
- [ ] Smooth animations

## 🔗 Quick Links

- [DND-KIT Docs](https://docs.dndkit.com/)
- [Zustand Docs](https://docs.pmnd.rs/zustand)
- [Next.js Docs](https://nextjs.org/docs)

---

**Everything you need on one page! 📄**
