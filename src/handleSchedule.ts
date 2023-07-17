import { Env } from ".";
import { dateFormatter } from "./services/utilService";

export default async (
  request: ScheduledEvent,
  env: Env,
  ctx: ExecutionContext
) => {
  const value = await env.TWILIO.get("cron");
  let cronDate = value ? new Date(value) : null;

  if (!cronDate) {
    cronDate = new Date();
    cronDate.setHours(0, 0, 0, 0);
    await env.TWILIO.put("cron", cronDate.toISOString());
  }

  const currentDate = new Date();
  const currentHour = currentDate.getHours();
  const cronHour = cronDate.getHours();

  if (currentHour === cronHour) {
    console.log("Scheduled Event: ", dateFormatter.format(currentDate));
  }
};
