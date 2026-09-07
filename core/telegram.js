const TELEGRAM_MAX_MESSAGE_LENGTH = 4096;

export function splitTelegramMessage(
  message,
  maxLength = TELEGRAM_MAX_MESSAGE_LENGTH,
) {
  if (message.length <= maxLength) return [message];

  const chunks = [];
  let remaining = message;

  while (remaining.length > maxLength) {
    let cut = remaining.lastIndexOf("\n\n", maxLength);
    if (cut > 0) {
      cut += 2;
    } else {
      cut = remaining.lastIndexOf("\n", maxLength);
      if (cut > 0) cut += 1;
    }

    if (cut <= 0) cut = maxLength;
    chunks.push(remaining.slice(0, cut));
    remaining = remaining.slice(cut);
  }

  if (remaining) chunks.push(remaining);
  return chunks;
}
