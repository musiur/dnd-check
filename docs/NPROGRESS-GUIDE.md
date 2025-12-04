# NProgress Loading Bar Guide

A proper implementation of GitHub-style loading bar for Next.js 16 App Router.

## How It Works

Unlike the ChatGPT approach that shows a fake animation after navigation, this implementation:

1. **Starts the bar BEFORE navigation** - triggered when you click a link or call router.push()
2. **Completes when route changes** - detected via usePathname() and useSearchParams()
3. **Works with all navigation types** - links, programmatic navigation, back/forward

## Usage

### Option 1: ProgressLink Component (Recommended)

Replace Next.js `Link` with `ProgressLink`:

```tsx
import ProgressLink from "@/components/progress-link";

<ProgressLink href="/about">About</ProgressLink>
```

### Option 2: Programmatic Navigation Hook

For router.push(), router.back(), etc:

```tsx
import { useProgressRouter } from "@/hooks/use-progress-router";

function MyComponent() {
  const router = useProgressRouter();
  
  const handleClick = () => {
    router.push("/dashboard");
  };
  
  return <button onClick={handleClick}>Go to Dashboard</button>;
}
```

### Option 3: Manual Control

For custom scenarios:

```tsx
import NProgress from "nprogress";

// Start manually
NProgress.start();

// Complete manually
NProgress.done();
```

## Customization

Edit `app/nprogress.css` to change:
- Color: Change `#3b82f6` to your brand color
- Height: Adjust `height: 3px`
- Shadow/glow effects

## Why This Works

- `ProgressLink` starts the bar on click (before navigation)
- `TopLoader` listens to pathname/searchParams changes and completes the bar
- Wrapped in Suspense to avoid hydration issues
- Handles edge cases: external links, modified clicks, etc.

## Demo

Visit `/demo-progress` to see it in action.
