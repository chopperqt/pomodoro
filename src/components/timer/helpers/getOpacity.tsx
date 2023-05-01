export const getOpacity = (value?: boolean) => {
  let opacity = 1

  if (!value) {
    opacity = 0.1
  }

  return {
    opacity,
  }
}
