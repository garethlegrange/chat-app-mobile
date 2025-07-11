import { mutation, query } from "./_generated/server";
import { v, ConvexError } from "convex/values";

export const sendMessage = mutation({
  args: {
    message: v.string(),
  },
  handler: async (ctx, args) => {
    const user = await ctx.auth.getUserIdentity();

    if (user === null) {
      throw new ConvexError("Not authenticated");
    }

    await ctx.db.insert("messages", {
      user_id: user?.subject,
      sender_id: user?.subject,
      sender_type: "client",
      content: args.message,
    });
  },
});

export const getMessages = query({
  args: {},
  handler: async (ctx) => {
    const user = await ctx.auth.getUserIdentity();

    if (user === null) {
      throw new ConvexError("Not authenticated");
    }

    console.log(`Fetching messages for user: ${JSON.stringify(user, null, 2)}`);

    return await ctx.db
      .query("messages")
      .filter((q) => q.eq(q.field("user_id"), user.subject))
      .collect();
  },
});
