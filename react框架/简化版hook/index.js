let isMound = true
let workInProgressHook = null

const fiber = {
    stateNode: App,
    memoizedState: null,
}

function useState(initialState) {
    let hook;

    if(isMound) {
        // 挂载
        hook = {
            memoizedState: initialState,
            next: null,
            queue: {
                pending: null
            }
        }
        if(!fiber.memoizedState) {
            fiber.memoizedState = hook
        } else {
            workInProgressHook.next = hook
        }
        workInProgressHook = hook
        // console.log(fiber);
    } else {
        // 更新
        hook = workInProgressHook
        workInProgressHook = workInProgressHook.next
    }

    let baseState = hook.memoizedState

    if(hook.queue.pending) {
        let firstUpdate = hook.queue.pending.next

        do {
            const action = firstUpdate.action
            baseState = action(baseState)
            firstUpdate = firstUpdate.next
        } while (firstUpdate !== hook.queue.pending.next);

        hook.queue.pending = null
    }
    
    hook.memoizedState = baseState

    return [baseState, dispatchAction.bind(null, hook.queue)]
}

function dispatchAction(queue, action) {
    console.log('action', typeof action);
    const update = {
        action,
        next: null
    }
    if(queue.pending === null) {
        update.next = update
    } else {
        queue.pending.next = update
        update.next = queue.pending.next
    }
    queue.pending = update
    schedule()
}

function schedule() {
    workInProgressHook = fiber.memoizedState
    const app = fiber.stateNode()
    isMound = false
    return app
}


function App() {
    const [num, setNum] = useState(0)
    const [num2, setNum2] = useState(10)

    console.log('isMound', isMound);
    console.log('num', num);
    console.log('num2', num2);
    return {
        onClick() {
            setNum(num => num + 1)
            setNum(num => num + 1)
        },
        onClickNum2() {
            setNum2(num => num + 10)
        }
    }
}

window.app = schedule()