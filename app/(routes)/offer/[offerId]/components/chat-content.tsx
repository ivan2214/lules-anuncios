import { Chat, Message, Store, User } from "@prisma/client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { ChatMessageForrm } from "./chat-message-form";
import { auth } from "@/auth";
import { cn } from "@/lib/utils";

interface MessageExtended extends Message {
  user: User | null;
  store: Store | null;
}

interface ChatExtended extends Chat {
  messages?: MessageExtended[];
}

interface ChatProps {
  store: Store;
  chat?: ChatExtended;
}

export const ChatContent: React.FC<ChatProps> = async ({ chat, store }) => {
  const session = await auth();
  const user = session?.user;
  console.log({user});

  return (
    <Card className="flex h-full flex-col w-full">
      {/* Chat header */}
      <CardHeader>
        <h1 className="text-lg font-semibold">{store.name}</h1>
      </CardHeader>
      {/* Chat messages */}
      {chat && chat.messages && (
        <CardContent className="w-full">
          <div className="flex-1 overflow-auto w-full p-4">
            <section className="grid gap-4">
              {chat?.messages?.map((message) => {
                const avatarImage =
                  message?.sender === "USER"
                    ? message?.user?.image
                    : store.image;
                return (
                  <div
                    key={message?.id}
                    className={cn(
                      "grid grid-cols-[40px_1fr] gap-4 items-start"
                    )}
                  >
                    <Avatar>
                      <AvatarImage alt="Avatar" src={avatarImage || ""} />
                      <AvatarFallback>
                        {message?.sender === "USER" ? "U" : "T"}
                      </AvatarFallback>
                    </Avatar>
                    <div className={`space-y-1`}>
                      <div className={cn("flex items-center gap-2")}>
                        <p className="font-medium">
                          {message?.sender === "USER"
                            ? message?.user?.name
                            : store.name}
                        </p>
                        <span className="text-xs text-gray-500 dark:text-gray-400">
                          {/* Aquí puedes mostrar la hora de creación del mensaje */}
                          {new Date(message?.createdAt).toLocaleString()}
                        </span>
                      </div>
                      <p className="text-sm font-light text-gray-500">
                        {message?.content}
                      </p>
                    </div>
                  </div>
                );
              })}
            </section>
          </div>
        </CardContent>
      )}
      {/* Chat input */}
      <CardFooter>
        <section className="border-t w-full bg-gray-100/40 px-4 py-2 dark:bg-gray-800/40">
          <ChatMessageForrm
            sender={user?.role === "USER" ? "USER" : "STORE"}
            chatId={chat?.id}
            senderId={user?.role === "USER" ? user?.id : store.id}
            storeId={store.id}
          />
        </section>
      </CardFooter>
    </Card>
  );
};
