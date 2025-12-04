import ProgressLink from "@/components/progress-link";

export default function DemoProgressPage() {
  return (
    <div className="min-h-screen p-8">
      <h1 className="text-3xl font-bold mb-8">NProgress Demo</h1>
      
      <div className="space-y-4">
        <div>
          <h2 className="text-xl font-semibold mb-2">Using ProgressLink Component:</h2>
          <div className="flex gap-4">
            <ProgressLink 
              href="/" 
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              Go to Home
            </ProgressLink>
            <ProgressLink 
              href="/demo-progress" 
              className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
            >
              Reload This Page
            </ProgressLink>
          </div>
        </div>

        <div className="mt-8">
          <h2 className="text-xl font-semibold mb-2">Code Examples:</h2>
          <div className="bg-gray-100 p-4 rounded">
            <pre className="text-sm">
{`// Option 1: Use ProgressLink component
import ProgressLink from "@/components/progress-link";

<ProgressLink href="/about">About</ProgressLink>

// Option 2: Use the hook for programmatic navigation
import { useProgressRouter } from "@/hooks/use-progress-router";

const router = useProgressRouter();
router.push("/dashboard");
router.back();`}
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
}
