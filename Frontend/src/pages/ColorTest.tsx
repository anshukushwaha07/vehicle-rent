import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function ColorTest() {
  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col items-center justify-center gap-6 p-6">
      <h1 className="text-4xl font-bold">🎨 Color Test</h1>

      <Card className="w-[300px]">
        <CardContent className="p-4">
          <p>This is a Card</p>
        </CardContent>
      </Card>

      <Button>Primary Button</Button>
    </div>
  );
}
