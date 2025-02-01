import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from './ui/button';
import { Input } from './ui/input';

interface NicknameDialogProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (nickname: string) => void;
  previousNicks: string[];
}

const NicknameDialog: React.FC<NicknameDialogProps> = ({
  open,
  onClose,
  onSubmit,
  previousNicks,
}) => {
  const [nickname, setNickname] = React.useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (nickname.trim()) {
      onSubmit(nickname.trim());
      setNickname('');
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Enter Your Nickname</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            value={nickname}
            onChange={(e) => setNickname(e.target.value)}
            placeholder="Enter nickname..."
          />
          {previousNicks.length > 0 && (
            <div className="space-y-2">
              <p className="text-sm text-muted-foreground">Previous nicknames:</p>
              <div className="flex flex-wrap gap-2">
                {previousNicks.map((nick) => (
                  <Button
                    key={nick}
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => setNickname(nick)}
                  >
                    {nick}
                  </Button>
                ))}
              </div>
            </div>
          )}
          <Button type="submit" disabled={!nickname.trim()}>
            Start Game
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default NicknameDialog;