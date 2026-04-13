import { createClient } from '@supabase/supabase-js'

const SUPABASE_URL = 'https://sjmbjgqpihzxeilaifnz.supabase.co'
const SUPABASE_KEY = 'sb_publishable_LCiU01yoU2Wi7qxof1HbFQ_Q_T9sqa_'

export const supabase = createClient(SUPABASE_URL, SUPABASE_KEY)