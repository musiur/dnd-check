"use client";

import { useRouter } from "next/navigation";
import NProgress from "nprogress";
import { useCallback } from "react";

export function useProgressRouter() {
  const router = useRouter();

  const push = useCallback(
    (href: string, options?: { scroll?: boolean }) => {
      NProgress.start();
      router.push(href, options);
    },
    [router]
  );

  const replace = useCallback(
    (href: string, options?: { scroll?: boolean }) => {
      NProgress.start();
      router.replace(href, options);
    },
    [router]
  );

  const back = useCallback(() => {
    NProgress.start();
    router.back();
  }, [router]);

  const forward = useCallback(() => {
    NProgress.start();
    router.forward();
  }, [router]);

  return {
    push,
    replace,
    back,
    forward,
    refresh: router.refresh,
    prefetch: router.prefetch,
  };
}
