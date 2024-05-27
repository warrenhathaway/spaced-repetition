const front = ['a', 'c', 'f', 'g', 'b', 'd', 'e']
const mid = ['f', 'c', 'g', 'a', 'd', 'b', 'e']

function Node(val) {
  this.value = val
  this.left = null
  this.right = null
}

function fn(front, mid) {
  if(!front.length || !mid.length) return new Node(null)
  const root = new Node(front[0])
  const idx = mid.findIndex(item => item === front[0])
  const leftMid = mid.slice(0, idx)
  const leftFront = front.slice(1, idx + 1)
  const rightMid = mid.slice(idx + 1)
  const rightFront = front.slice(idx + 1)
  root.left = fn(leftFront, leftMid)
  root.right = fn(rightFront, rightMid)
  // console.log(idx, leftMid, rightMid, leftFront, rightFront)
  return root
}

const res = fn(front, mid)
console.log(res);