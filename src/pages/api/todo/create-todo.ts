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
    if (req.method == 'POST' ) {

        if (req.method !== 'POST' || !req.body.title) {
            return res.status(400).json({ error: 'Please Create a new todo..' })
        }

        const { data, error: selectError } = await supabaseClient
        .from('todo')
        .select('title')
        .eq('title', req.body.title);

        if (selectError) {
            return res.status(500).json({ error: selectError.message });
        }

        if (data && data.length > 0) {
            return res.status(400).json({ error: 'Todo already exists.' });
        }

        const { error } = await supabaseClient
        .from('todo')
        .insert(
            { 
                title: req.body.title, 
                completed: 'not_complete'
            },
        )
        if (error) {
            return res.status(500).json({ error: error.message })
        }
        res.status(200).json({data: 'Todo Created Successfully'})
    }
}
