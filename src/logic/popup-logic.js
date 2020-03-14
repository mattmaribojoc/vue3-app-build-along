// This file will contain reused logic between our popup components
export function usePopupLogic (name, emit) {
  const close = () => {
    emit('close', {
      name
    })
  }

  return {
    close
  }
}