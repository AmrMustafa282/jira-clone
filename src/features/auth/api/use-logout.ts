import { useMutation, useQueryClient } from '@tanstack/react-query'
import { InferResponseType } from 'hono'

import { client } from '@/lib/rpc'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'

type ResponseType = InferResponseType<(typeof client.api.auth.logout)['$post']>

export const useLogout = () => {
  const router = useRouter()
  const queryClient = useQueryClient()

  return useMutation<ResponseType, Error>({
    mutationFn: async () => {
      const response = await client.api.auth.logout.$post()
      if (!response.ok) {
        throw new Error('Failed to sign up')
      }
      return await response.json()
    },
    onSuccess: () => {
      toast.success('Logged out successfully')
      router.refresh()
      queryClient.invalidateQueries({ queryKey: ['current'] })
    },
    onError: (error) => {
      toast.error('Failed to logout')
      console.error(error)
    },
  })
}
