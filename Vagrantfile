Vagrant.configure("2") do |config|

    config.vm.define "machine" do |machine|
        machine.vm.box = "bento/ubuntu-20.04-arm64"
        machine.vm.box_version = "202301.20.0"
        machine.vm.hostname = "machine"
        machine.vm.network "private_network", ip: "10.10.0.100"
        machine.vm.provision "shell", path: "application/setup.sh"
        machine.vm.provider "parallels" do |vb|
            vb.memory = "2048"
            vb.cpus = "2"
        end
    end
end