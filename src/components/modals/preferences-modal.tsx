"use client";
import React from "react";
import { DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";

interface PreferencesModalProps {
  sound: boolean;
  motion: boolean;
  onUpdatePreferences: (s: boolean, m: boolean) => void;
  onClearData: () => void;
}

export const PreferencesModal: React.FC<PreferencesModalProps> = ({
  sound,
  motion,
  onUpdatePreferences,
  onClearData,
}) => {
  return (
    <>
      <DialogTitle className="dialog-display">
        Make yourself comfortable.
      </DialogTitle>
      <DialogDescription>
        These preferences are saved only in this browser.
      </DialogDescription>
      <label className="setting-row">
        <span>
          <strong>Subtle sound</strong>
          <small>A soft chime on reveal. Off by default.</small>
        </span>
        <Switch
          checked={sound}
          onCheckedChange={(s) => onUpdatePreferences(s, motion)}
          aria-label="Subtle sound"
        />
      </label>
      <label className="setting-row">
        <span>
          <strong>Motion</strong>
          <small>Turn off animated reveals and transitions.</small>
        </span>
        <Switch
          checked={motion}
          onCheckedChange={(m) => onUpdatePreferences(sound, m)}
          aria-label="Motion"
        />
      </label>
      <Button onClick={onClearData}>
        Clear saved demo choices
      </Button>
    </>
  );
};
