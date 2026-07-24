import {
  SignedIn,
  SignedOut,
  SignInButton,
  SignUpButton,
  UserButton,
} from "@clerk/clerk-react";
import { Button } from '@heroui/react';

function App() {
  return (
    <div>
      <h1>My App</h1>
    <Button>
      My Button
    </Button>
      <header>
        <SignedOut>
          <SignInButton mode="modal" />
          <SignUpButton mode="modal" />
        </SignedOut>

        <SignedIn>
          <UserButton />
        </SignedIn>
      </header>
    </div>
  );
}

export default App;