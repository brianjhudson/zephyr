import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";
import { ThemeToggle } from "./theme-toggle";
import { NavLink } from "./nav-link";
import * as NavigationMenu from "@radix-ui/react-navigation-menu";

export function Nav() {
  return (
    <header className="fixed top-0 left-0 right-0 bg-background border-b z-50">
      <NavigationMenu.Root className="relative z-10 flex w-full justify-between items-center p-4">
        <div className="flex items-center space-x-6">
          <NavLink
            href="/"
            exact
            className="text-2xl md:text-3xl font-medium tracking-wide px-2 py-1"
          >
            <span
              style={{ fontFamily: "var(--font-luxurious-script), cursive" }}
            >
              Zephyr
            </span>
          </NavLink>
        </div>

        <NavigationMenu.List className="flex items-center space-x-4">
          <NavigationMenu.Item>
            <SignedIn>
              <NavLink href="/dashboard">Dashboard</NavLink>
            </SignedIn>
          </NavigationMenu.Item>

          <NavigationMenu.Item>
            <ThemeToggle />
          </NavigationMenu.Item>

          <NavigationMenu.Item>
            <SignedOut>
              <SignInButton />
            </SignedOut>
            <SignedIn>
              <UserButton />
            </SignedIn>
          </NavigationMenu.Item>
        </NavigationMenu.List>

        <NavigationMenu.Viewport className="absolute left-0 top-full flex justify-center w-full" />
      </NavigationMenu.Root>
    </header>
  );
}
