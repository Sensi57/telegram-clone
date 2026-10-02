import { useState } from "react";
import { Sidebar } from "@/widgets/sidebar/ui/Sidebar";
import { ChatWindow } from "@/widgets/chat-window/ui/ChatWindow";
import { useReceiveMessages } from "@/features/receive-messages/model/useReceiveMessages";
import { SettingsPanel } from "@/widgets/settings-panel/ui/SettingsPanel";

type View = "list" | "chat" | "settings";

export function ChatPage() {
  useReceiveMessages();
  const [view, setView] = useState<View>("list");

  return (
    <div className="h-full w-full overflow-hidden flex bg-app">
      <aside
        className={`${
          view === "list" ? "flex" : "hidden"
        } md:flex w-full md:w-[300px] xl:w-[320px] shrink-0 border-r border-line`}
      >
        <Sidebar
          onOpenChat={() => setView("chat")}
          onOpenSettings={() => setView("settings")}
        />
      </aside>
      <main
        className={`${
          view === "list" ? "hidden" : "flex"
        } md:flex flex-col flex-1 min-w-0`}
      >
        {view === "settings" ? (
          <SettingsPanel onBack={() => setView("list")} />
        ) : (
          <ChatWindow onBack={() => setView("list")} />
        )}
      </main>
    </div>
  );
}
