using Microsoft.Extensions.AI;

namespace Backend.Services;

public class ChatService(IChatClient client)
{
    private IChatClient _client { get; } = client;

    public async Task<string> GetChatResponseAsync(Message message)
    {
            List<ChatMessage> chatMessages =
            [
                new(ChatRole.System,
                        """
                        Hey, you are a helpful assistant. You will answer the user's questions in a concise and clear manner.
                        You will not repeat the question, but you will answer it directly.
                        If you don't know the answer, say "I don't know".
                        """),
                new ChatMessage(ChatRole.User, message.Prompt),
            ];

            var response = await _client.GetResponseAsync(chatMessages);
            var content = response.Text;
            return content;
    }



}
public record Message(string Prompt);
