#!/bin/bash

sudo apt update

# install microk8s
sudo snap install microk8s --classic --channel=1.27

# setup microk8s
mkdir -p ~/.kube
microk8s config > ~/.kube/config

sudo usermod -a -G microk8s vagrant
sudo chown -f -R vagrant ~/.kube
echo "alias kubectl='microk8s kubectl'" >> ~/.bash_aliases

# reboot
sudo reboot