#!/usr/bin/env bash

PIPROTO_TARBALL_PATH="https://github.com/paceco/pi-proto/tarball/master"
PIPROTO_GIT_REMOTE="https://github.com/paceco/pi-proto.git"


# FANCY MESSAGES ===============================================================

# Header logging
e_header() {
  printf "\n$(tput setaf 7)%s$(tput sgr0)\n" "$@"
}

# Success logging
e_success() {
  printf "$(tput setaf 64)✓ %s$(tput sgr0)\n" "$@"
}

# Error logging
e_error() {
  printf "$(tput setaf 1)x %s$(tput sgr0)\n" "$@"
}

# Warning logging
e_warning() {
  printf "$(tput setaf 136)! %s$(tput sgr0)\n" "$@"
}

# FUNCTIONS ====================================================================

# Test whether a command exists
# $1 - cmd to test
type_exists() {
  if [ $(type -P $1) ]; then
    return 0
  fi
  return 1
}

grabfiles(){
  TARGET_DIRECTORY=$1
  if [[ ! -d ./${TARGET_DIRECTORY} ]]; then
    e_header "Downloading pi-proto..."
    mkdir ./${TARGET_DIRECTORY}
    # Get the tarball
    curl -fsSLo ${HOME}/pi-dotfiles.tar.gz ${PIPROTO_TARBALL_PATH}
    # Extract to the dotfiles directory
    tar -zxf ${HOME}/pi-dotfiles.tar.gz --strip-components 1 -C ./${TARGET_DIRECTORY}
    e_success "pi-proto downloaded."
    e_header "Cleaning up..."
    # Remove the tarball
    rm -rf ${HOME}/pi-dotfiles.tar.gz
    # Remove the script, we don't need it anymore
    rm -rf ./${TARGET_DIRECTORY}/bin
    e_success "Cleanup done."
    e_header "Installing all things node for you..."
    cd ./$TARGET_DIRECTORY && npm install
    e_success "NPM modules installed."
    e_success "Prototype \"$TARGET_DIRECTORY\" ready to go! Happy coding"
    printf "(Remember, you must cd into your new prototype and run \"gulp\" to start the servers and watch process...)"
  else
    e_error "There's something already there. Try picking a different name or removing the old directory."
  fi
}


# BEGIN SCRIPT =================================================================

# Make sure we have node installed first
if ! type_exists 'node'; then
  e_error "You must have node installed first before this toolkit will run."
  printf "If that's the case, chances are your machine may not be fully setup yet.\n"
  printf "[future directions to fix here], but for now, go see Nathan Long..."
  exit 1
fi

# Make sure we have gulp installed
if ! type_exists 'gulp'; then
  e_error "You must have the global version of Gulp install before this toolkit will run."
  printf "Looks like you have Node, but not Gulp\n" 
  printf "Try running: npm install -g gulp"
  exit 1
fi

# Name the new prototype and kick off process
e_header "Name your prototype (no spaces or special characters)..."
read -e -p "> " proto_name
if [[ $proto_name ]]; then
  e_success "Nice choice, creating the prototype \"$proto_name\""
  grabfiles $proto_name
else
  e_error "Sorry, no name, no prototype. Try again..."
fi
