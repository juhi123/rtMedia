if [ "$TRAVIS_PULL_REQUEST" == "false" ]; then
  echo -e "Starting to update reporting\n"

  #copy data we're interested in to other place
  cp -R target/surefire-reports $HOME/reports

  #go to home and setup git
  cd $HOME
  git config --global user.email "travis@travis-ci.org"
  git config --global user.name "Travis"

  #using token clone reporting branch
  git clone --quiet --branch=reporting https://${GH_TOKEN}@github.com/juhi123/rtMedia.git  reporting > /dev/null
 

  #go into diractory and copy data we're interested in to that directory
  cd reporting
  git rm /*
  cp -Rf $HOME/reports/* .
 

  #add, commit and push files
  git add -f .
  git commit -m "Travis build $TRAVIS_BUILD_NUMBER pushed to reporting"
  git push -fq origin reporting > /dev/null

  echo -e "Done magic with coverage\n"
fi
