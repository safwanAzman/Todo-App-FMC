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
    if (req.method == 'DELETE' ) {
        const { data, error } = await supabaseClient
        .from('todo')
        .delete()
        .eq('id', req.body.id)

        if (error) {
            return res.status(500).json({ error: error.message })
        }
        
        res.status(200).json({data: 'Delete Succesfully'})
    }
}
