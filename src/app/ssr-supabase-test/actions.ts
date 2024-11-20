'use server'

import { createClerkSupabaseClientSsr } from './client'

const client = createClerkSupabaseClientSsr()

export async function addTask(name: string) {
    try {
        const response = await client.from('tasks').insert({
            name,
        })
        console.log('Task successfully added!', response)
    } catch (error: any) {
        console.error('Error adding task:', error.message)
        throw new Error('Failed to add task')
    }
}

export async function deleteTask(taskId: number) {
    try {
        const response = await client.from('tasks').delete().eq('id', taskId)
        console.log('Task successfully deleted!', response)
    } catch (error: any) {
        console.error('Error deleting task:', error.message)
        throw new Error('Failed to delete task')
    }
}

export async function setTaskState(taskId: number, isDone: boolean) {
    try {
        const response = await await client
            .from('tasks')
            .update({
                is_done: isDone,
            })
            .eq('id', taskId)
        console.log('Task successfully updated!', response)
    } catch (error: any) {
        console.error('Error updating task:', error.message)
        throw new Error('Failed to update task')
    }
}