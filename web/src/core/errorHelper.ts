export function tryGetMessage(error: any) {
  if (error) {
    console.error(error, typeof error);
    if (error.response) {
      if (error.response.status === 400) {
        if (error.response.data) {
          if (typeof error.response.data === "string" || error.response.data instanceof String)
            return error.response.data;
          if (error.response.data.message)
            return error.response.data.message;
        }
        return "Bad request";
      }
      if (error.response.status === 500) {
        return "Server error";
      }
    }
  }
  return "Network error";
}