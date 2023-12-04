export default function logError(
  message: string,
  error?: { message: string },
  namespace?: string
) {
  console.log(JSON.stringify({ message, error: error?.message, namespace }));
}
