export default function logError(
  message: string,
  error: Error,
  namespace?: string
) {
  console.log(JSON.stringify({ message, error: error.message, namespace }));
}
