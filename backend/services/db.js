const { createClient } = require('@supabase/supabase-js');
const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_KEY);

async function getTodos() {
  const { data } = await supabase.from('todos').select('*');
  return data;
}

async function addTodo(text) {
  const { data } = await supabase.from('todos').insert([{ text }]).select();
  return data[0];
}

async function deleteTodo(id) {
  await supabase.from('todos').delete().eq('id', id);
}

async function updateTodo(id, text) {
  const { data, error } = await supabase
    .from('todos')
    .update({ text })
    .eq('id', id)
    .select();

  if (error) throw error;
  return data[0];
}


module.exports = { getTodos, addTodo, deleteTodo,updateTodo };
