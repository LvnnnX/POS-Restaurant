import { http, HttpResponse } from 'msw'
import { menuItems } from './data/menu'

export const handlers = [
  http.get('/api/menu', () => HttpResponse.json(menuItems)),
  http.get('/api/menu/:category', ({ params }) => {
    const filtered = menuItems.filter(p => p.category === (params.category as string))
    return HttpResponse.json(filtered)
  }),
  http.post('/api/orders', async ({ request }) => {
    const body: any = (await request.json()) || {}
    return HttpResponse.json({ id: 'order-1', ...body, status: 'open' })
  }),
  http.post('/api/payments', async ({ request }) => {
    const body: any = (await request.json()) || {}
    return HttpResponse.json({ success: true, orderId: body.orderId })
  }),
]
