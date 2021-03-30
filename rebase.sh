#！/bin/sh
echo "start rebase..."
echo "pull latest develop branch"
# git stash
# 将最新的develop合并到本地
git pull origin develop:develop
git rebase origin/develop
# 将develop变基到当前分支
git checkout qa
git rebase develop
git push
git checkout master
git rebase develop
git push
git checkout develop
git push
# git stash pop
echo "rebase success!!!!"
