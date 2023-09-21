// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { createClient } from '@supabase/supabase-js'
import type { NextApiRequest, NextApiResponse } from 'next'


const supabaseClient = createClient(
    `${process.env.NEXT_PUBLIC_SUPABASE_URL}`, 
    `${process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY}`
)

export default async function handler(
req: NextApiRequest,
res: NextApiResponse<any>
) {

    if (req.method == 'PATCH') {

        const { data: todo, error: fetchError } = await supabaseClient
            .from('todo')
            .select('completed')
            .eq('id', req.body.id)
            .single();

        if (fetchError) {
            return res.status(500).json({ error: fetchError.message });
        }

        if (!todo) {
            return res.status(404).json({ error: 'Todo not found.' });
        }

        const updatedStatus = todo.completed === "complete" ? "not_complete" : "complete";

        const {error: updateError } = await supabaseClient
            .from('todo')
            .update({ completed: updatedStatus })
            .eq('id', req.body.id);

        if (updateError) {
            return res.status(500).json({ error: updateError.message });
        }

        return res.status(200).json({ code: 200, message: "Todo updated successfully" });
    }
}
