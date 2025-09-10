export function Footer() {
  return (
    <footer className="px-4 max-w-7xl mx-auto py-8 border-t border-border">
      <div className="text-center text-muted-foreground text-sm">
        <p>&copy; {new Date().getFullYear()} Zephyr. All rights reserved.</p>
      </div>
    </footer>
  );
}
