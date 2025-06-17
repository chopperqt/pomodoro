export const getNormalizeTime = (msTime: number) => {
  return {
    minutes: Math.floor(msTime / 60 / 1000),
    seconds: Math.floor(msTime / 1000)
  }
}
