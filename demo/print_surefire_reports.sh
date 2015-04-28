#!/usr/bin/env sh
echo "Current directory is $(pwd)"
echo "\n=== SUREFIRE REPORTS ===\n"

for F in target/surefire-reports/*.txt
do
    echo $F
    cat $F
    echo
done

if [ "$TRAVIS_PULL_REQUEST" == "false" ]; then
  echo -e "Starting to update reporting\n"

  #copy data we're interested in to other place
  cp -R coverage $HOME/build/juhi123/rtMedia/demo/target/surefire-reports

  #go to home and setup git
  cd $HOME
  git config --global user.email "travis@travis-ci.org"
  git config --global user.name "Travis"

  #using token clone gh-pages branch
  git clone --quiet --branch=reporting https://${GH_TOKEN}@github.com/juhi123/rtMedia.git  reporting > /dev/null

  #go into diractory and copy data we're interested in to that directory
  cd reporting
  cp -Rf $HOME/build/juhi123/rtMedia/demo/target/surefire-reports/* .

  #add, commit and push files
  git add -f .
  git commit -m "Travis build $TRAVIS_BUILD_NUMBER pushed to reporting"
  git push -fq origin reporting > /dev/null

  echo -e "Done magic with coverage\n"
fi

