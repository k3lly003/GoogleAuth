import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { Label } from "@/components/ui/label";

const EditUserModal = ({ isOpen, onClose, user, onUpdate }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('');

  useEffect(() => {
    if (user) {
      setName(user.name);
      setEmail(user.email);
      setRole(user.role);
    }
  }, [user]);

  const handleUpdateUser = () => {


    onUpdate({ name, email, password, role });
    onClose(); 
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-lg bg-[#F8F8F8] border-none">
        <DialogHeader>
          <DialogTitle className="text-center text-xl font-bold">Edit User</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div className="flex flex-col">
            <Label htmlFor="name">Name</Label>
            <Input 
              id="name"
              placeholder="Name" 
              value={name} 
              onChange={(e) => setName(e.target.value)} 
              className="mt-2"
            />
          </div>
          <div className="flex flex-col">
            <Label htmlFor="email">Email</Label>
            <Input 
              id="email"
              placeholder="Email" 
              value={email} 
              onChange={(e) => setEmail(e.target.value)} 
              className="mt-2"
            />
          </div>
          <div className="flex flex-col">
            <Label htmlFor="password">Password (leave blank to keep current)</Label>
            <Input 
              id="password"
              placeholder="Password" 
              type="password"
              value={password} 
              onChange={(e) => setPassword(e.target.value)} 
              className="mt-2"
            />
          </div>
          <div className="flex flex-col">
            <Label htmlFor="role">Role</Label>
            <Select id="role" value={role} onValueChange={setRole}>
              <SelectTrigger>
                <SelectValue placeholder="Select role" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="admin">Admin</SelectItem>
                <SelectItem value="user">User</SelectItem>
                <SelectItem value="manager">Manager</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        <DialogFooter className="flex mt-6">
          <Button onClick={handleUpdateUser} className="bg-[#0FA958] text-white px-8 py-2">Update</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default EditUserModal;
