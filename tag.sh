VERSION=$(node -e "(function () { console.log(require('./package.json').version) })()")
echo v$VERSION
git tag v$VERSION
git push origin v$VERSION