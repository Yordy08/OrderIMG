export function useAlert() {
  const swal = useNuxtApp().$swal as any

  return {
    confirm: async (title: string, text: string) => {
      const result = await swal.fire({
        title,
        text,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Continuar',
        cancelButtonText: 'Cancelar',
        reverseButtons: true,
        focusCancel: true
      })
      return result.isConfirmed
    },
    prompt: async (title: string, value = '', label = 'Texto') => {
      const result = await swal.fire({
        title,
        input: 'text',
        inputLabel: label,
        inputValue: value,
        inputPlaceholder: 'Escribe aquí...',
        showCancelButton: true,
        confirmButtonText: 'Guardar',
        cancelButtonText: 'Cancelar',
        reverseButtons: true,
        inputValidator: (input: string) => input.trim() ? undefined : 'Este campo es obligatorio.'
      })
      return result.isConfirmed ? String(result.value || '').trim() : null
    },
    success: (title: string, text = '') => swal.fire({ title, text, icon: 'success', timer: 1800, showConfirmButton: false }),
    error: (title: string, text = '') => swal.fire({ title, text, icon: 'error' })
  }
}
