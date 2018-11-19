<template>
  <div id="directory-content" class="directory-content">
    <div id="directory"></div>
  </div>
</template>

<script>
  /* eslint-disable */
  export default {
      name: 'directory',
      methods: {
        postDirectoryBuild () {
          var postChildren = function children (childNodes, reg) {
            var result = []
            var isReg = typeof reg === 'object'
            var isStr = typeof reg === 'string'
            var node
            var i
            var len
            for (i = 0, len = childNodes.length; i < len; i++) {
              node = childNodes[i]
              if ((node.nodeType === 1 || node.nodeType === 9) &&
                (!reg || isReg && reg.test(node.tagName.toLowerCase()) ||
                  isStr && node.tagName.toLowerCase() === reg)) {
                result.push(node)
              }
            }
            return result
          }
          var createPostDirectory = function (article, directory, isDirNum) {
            var contentArr = []
            var titleId = []
            var root
            var level
            var currentList
            var list
            var li
            var link
            var i
            var len
            var levelArr = (function (article, contentArr, titleId) {
              var titleElem = postChildren(article.childNodes, /^h\d$/)
              var levelArr = []
              var lastNum = 1
              var lastRevNum = 1
              var count = 0
              var guid = 1
              var id = 'directory' + (Math.random() + '').replace(/\D/, '')
              var num
              var elem
              while (titleElem.length) {
                elem = titleElem.shift()
                contentArr.push(elem.innerHTML)
                num = +elem.tagName.match(/\d/)[0]
                if (num > lastNum) {
                  levelArr.push(1)
                  lastRevNum += 1
                } else if (num === lastRevNum ||
                  num > lastRevNum && num <= lastNum) {
                  levelArr.push(0)
                } else if (num < lastRevNum) {
                  levelArr.push(num - lastRevNum)
                  lastRevNum = num
                }
                count += levelArr[levelArr.length - 1]
                lastNum = num
                elem.id = elem.id || (id + guid++)
                titleId.push(elem.id)
              }
              if (count !== 0 && levelArr[0] === 1) levelArr[0] = 0

              return levelArr
            })(article, contentArr, titleId)
            currentList = root = document.createElement('ul')
            var dirNum = [0]
            for (i = 0, len = levelArr.length; i < len; i++) {
              level = levelArr[i]
              if (level === 1) {
                list = document.createElement('ul')
                if (!currentList.lastElementChild) {
                  currentList.appendChild(document.createElement('li'))
                }
                currentList.lastElementChild.appendChild(list)
                currentList = list
                dirNum.push(0)
              } else if (level < 0) {
                level *= 2
                while (level++) {
                  if (level % 2) dirNum.pop()
                  currentList = currentList.parentNode
                }
              }
              dirNum[dirNum.length - 1]++
              li = document.createElement('li')
              link = document.createElement('a')
              link.href = '#' + titleId[i]
              link.innerHTML = !isDirNum ? contentArr[i]
                : dirNum.join('.') + ' ' + contentArr[i]
              li.appendChild(link)
              currentList.appendChild(li)
            }
            directory.appendChild(root)
          }
          createPostDirectory(document.getElementById('article-content'), document.getElementById('directory'), true)
        }
      }
    }
</script>

<style scoped>

</style>
