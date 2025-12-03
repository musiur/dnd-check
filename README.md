# Bidirectional Drag & Drop Kanban Board

A production-ready implementation of **bidirectional drag-and-drop** between a sidebar and Kanban board using a hybrid approach (Native HTML5 + DND-KIT).

![Next.js](https://img.shields.io/badge/Next.js-16-black)
![React](https://img.shields.io/badge/React-19-blue)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue)
![DND-KIT](https://img.shields.io/badge/DND--KIT-6.3-green)

## 🎯 Features

- ✅ **Drag from Sidebar → Kanban Board** (any column)
- ✅ **Drag from Kanban Board → Sidebar** (remove from board)
- ✅ **Reorder tasks within columns** (smooth animations)
- ✅ **Move tasks between columns** (drag & drop)
- ✅ **Visual feedback** (hover states, drag cursors)
- ✅ **Type-safe** (full TypeScript)
- ✅ **Production-ready** (optimized performance)

## 🚀 Quick Start

```bash
# Install dependencies
pnpm install

# Run development server
pnpm dev
```

**Two versions available:**
- **Hybrid** (Native + DND-KIT): [http://localhost:3000](http://localhost:3000)
- **Pure Native** (Zero dependencies): [http://localhost:3000/native](http://localhost:3000/native)

## 🏗️ Architecture

This project uses a **hybrid approach** combining:

1. **Native HTML5 Drag & Drop** - For cross-boundary dragging (sidebar ↔ board)
2. **DND-KIT** - For enhanced UX within the Kanban board
3. **Zustand** - For global state management

### Why Hybrid?

| Approach | Cross-Boundary | Animations | Performance | Verdict |
|----------|----------------|------------|-------------|---------|
| Global DND-KIT | ✅ | ✅ | ❌ | Not scalable |
| Scoped DND-KIT | ⚠️ | ✅ | ⚠️ | Limited |
| Pure Native | ✅ | ❌ | ✅ | Basic UX |
| **Hybrid** | ✅ | ✅ | ✅ | **Best** ✨ |

## 📁 Project Structure

```
├── app/
│   ├── layout.tsx              # Root layout (Server Component)
│   └── page.tsx                # Main page with sidebar + board
├── components/
│   ├── sidebar.tsx             # Draggable source + drop target
│   ├── kanban-board.tsx        # DND-KIT context wrapper
│   ├── kanban-column.tsx       # Drop zone for cards
│   └── kanban-card.tsx         # Hybrid draggable card
├── lib/
│   └── store.ts                # Zustand state management
└── docs/
    ├── QUICK-START.md          # Getting started guide
    ├── ARCHITECTURE.md         # System architecture
    ├── DRAG-DROP-IMPLEMENTATION.md
    ├── APPROACH-COMPARISON.md
    └── IMPLEMENTATION-SUMMARY.md
```

## 🎨 How It Works

### Universal Cards (Support Both Systems)

```typescript
<div
  {...dndKitListeners}    // DND-KIT for internal dragging
  draggable="true"         // Native HTML5 for external dragging
  onDragStart={...}        // Native handler
>
  Card Content
</div>
```

### Smart Drop Zones (Accept Both Sources)

```typescript
<div
  ref={dndKitRef}         // DND-KIT droppable
  onDrop={...}            // Native drop handler
  onDragOver={...}        // Required for native drops
>
  Drop Zone
</div>
```

## 🔄 Drag Flows

### Sidebar → Kanban
```
User drags card → Native onDragStart → Drop on column → 
Native onDrop → Zustand update → Card moves to board
```

### Kanban → Sidebar
```
User drags card → Native onDragStart → Drop on sidebar → 
Native onDrop → Zustand update → Card returns to sidebar
```

### Within Kanban
```
User drags card → DND-KIT activates → Collision detection → 
onDragEnd → Zustand update → Smooth animation
```

## 📚 Documentation

**[📖 Full Documentation Index](docs/README.md)** - Complete documentation guide

### Quick Links
- **[QUICK-START.md](docs/QUICK-START.md)** - Get up and running
- **[NATIVE-VS-HYBRID.md](docs/NATIVE-VS-HYBRID.md)** - Compare both implementations
- **[ARCHITECTURE.md](docs/ARCHITECTURE.md)** - System design & diagrams
- **[TESTING-GUIDE.md](docs/TESTING-GUIDE.md)** - Test cases and debugging
- **[QUICK-REFERENCE.md](docs/QUICK-REFERENCE.md)** - One-page reference

**See [docs/](docs/) folder for all 13 documentation files.**

## 🎯 Use Cases

This pattern works for:

- ✅ Trello-like project management
- ✅ E-commerce product builders
- ✅ File managers with nested folders
- ✅ Form builders with component palettes
- ✅ Dashboard widget customization
- ✅ Any app with deeply nested routes

## 🔧 Tech Stack

- **Next.js 16** - App Router with Server Components
- **React 19** - Latest React features
- **TypeScript 5** - Type safety
- **DND-KIT 6.3** - Drag & drop library
- **Zustand 5** - State management
- **Tailwind CSS 4** - Styling

## 🌟 Key Innovation

**Problem:** DND-KIT requires shared context, which doesn't work across Next.js layout boundaries.

**Solution:** Use Native HTML5 for cross-boundary communication, DND-KIT for enhanced UX within features.

This allows dragging between:
- Root layout sidebar
- Deeply nested route pages (3-4+ layers)
- Parallel routes
- Route groups
- Any component boundary

## 🚀 Performance

- **Native drag events**: Browser-level (C++) - extremely fast
- **DND-KIT**: Only loaded on Kanban routes
- **Zustand**: Minimal re-renders with selectors
- **Code splitting**: Automatic with Next.js
- **Bundle size**: +2KB (Zustand) + 50KB (DND-KIT on Kanban routes only)

## 🧪 Testing

Try these interactions:

1. Drag "New Feature" from sidebar → "To Do" column
2. Reorder tasks within "To Do" column
3. Move task from "To Do" → "In Progress"
4. Drag task back to sidebar

All flows should work smoothly with visual feedback!

## 🔮 Future Enhancements

- [ ] Persist state to localStorage
- [ ] Touch device support (polyfill)
- [ ] Keyboard navigation
- [ ] Undo/redo functionality
- [ ] Multi-select drag
- [ ] Backend API integration
- [ ] Real-time collaboration

## 📖 Learn More

### Next.js
- [Next.js Documentation](https://nextjs.org/docs)
- [Learn Next.js](https://nextjs.org/learn)

### DND-KIT
- [DND-KIT Documentation](https://docs.dndkit.com/)
- [DND-KIT Examples](https://master--5fc05e08a4a65d0021ae0bf2.chromatic.com/)

### Zustand
- [Zustand Documentation](https://docs.pmnd.rs/zustand/getting-started/introduction)

## 🤝 Contributing

This is a demonstration project. Feel free to:
- Fork and experiment
- Use in your own projects
- Adapt the pattern to your needs

## 📝 License

MIT

## 🙏 Acknowledgments

- **DND-KIT** - Excellent drag & drop library
- **Zustand** - Simple state management
- **Next.js** - Amazing React framework

---

**Built with ❤️ to demonstrate production-ready bidirectional drag & drop in Next.js**
# dnd-check
