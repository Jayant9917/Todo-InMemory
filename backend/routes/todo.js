let todos = []; // in memory space


export async function getAllTodo (req, res, next){
    try{
        res.status(200).json(todos);
    } catch(error){
        next(error);
    }
}

export async function createTodo (req, res, next){
    try{
        // Get the todo text from the request body
        const { text } = req.body;

        // Validate input
        if(!text || typeof text !== 'string'){
            return res.status(400).json({
                error : 'todo text is required and must be a string'
            });
        }

        // Create new todo object 
        const newTodo = {
            id: Date.now().toString(), //ID generation using time stamp
            text,
            completed: false, // Default to not completed
            createdAt: new Date().toISOString()
        };

// Creates a new todo object with:
// Unique ID (using timestamp)
// The text
// Default completed: false        
// Creation timestamp

        // Add to todos Array
        todos.push(newTodo);

        // Return the new todo with 201 Created status
        res.status(201).json(newTodo);
    } catch(error){
        next(error);
    }
}

export async function updateTodo (req, res, next){
    // Gets the todo ID from URL params
    // Gets update fields (text, completed) from request body
    // Finds the todo index in the array
    // Returns 404 if not found
    // Updates only the provided fields
    // Returns the updated todo
    try{
        const { id } = req.params;
        const { text, completed } = req.body;

        // Find the Todo to update
        const todoIndex = todos.findIndex(todo => todo.id === id);

        // If not Found, return 404
        if(todoIndex === -1){
            return res.status(404).json({
                error : "Todo not found"
            })
        }

        //Update the todo
        if (text !== undefined){
            todos[todoIndex].text = text;
        }
        if (completed !== undefined){
            todos[todoIndex].completed = completed;
        }

        // Return the updated todo
        res.status(200).json(todos[todoIndex]);
    } catch (error){
        next(error);
    }
}

export async function deleteTodoById (req, res, next){
    // Gets ID from URL params
    // Finds the todo index
    // Returns 404 if not found
    // Removes the todo using splice()
    // Returns the deleted todo
    try{
        const { id } = req.params;

        //Find the todo Index
        const todoIndex = todos.findIndex(todo => todo.id === id);

        // If not found, return 404
        if (todoIndex === -1){
            return res.status(404).json({
                error : " todo not found "
            });
        }
        
        //Remove the todo from array
        const [deletedTodo] = todos.splice(todoIndex, 1);

        //  return the deleted todo
        res.status(200).json(deletedTodo);
    } catch (error){
        next(error);
    }
}

// export async function searchTodo(req, res) {
//     const { q } = req.query;
//     const results = todos.filter(todo => 
//         todo.text.toLowerCase().includes(q.toLowerCase())
//     );
//     res.json(results);
// }