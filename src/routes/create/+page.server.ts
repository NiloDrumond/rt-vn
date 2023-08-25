import { redirect, type Actions } from "@sveltejs/kit";

export const actions: Actions = {
  create: async ({ request, cookies }) => {
    const data = await request.formData();
    const story = data.get('story-context');
    if (typeof story === 'string' && story.length > 0) {
      throw redirect(303, '/vn')
    }
  }
}
