git add -A
git commit -m $2
git pull origin $1
git checkout master
git pull
git checkout $1
git rebase master
git push origin $1
