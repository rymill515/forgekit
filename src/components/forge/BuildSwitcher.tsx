import { Check, ChevronsUpDown, Plus, Copy, Trash2 } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import type { Build } from "@/lib/build-storage";

type Props = {
  builds: Build[];
  activeId: string;
  activeName: string;
  onSwitch: (id: string) => void;
  onNew: () => void;
  onDuplicate: (id: string) => void;
  onDelete: (id: string) => void;
};

export function BuildSwitcher({
  builds,
  activeId,
  activeName,
  onSwitch,
  onNew,
  onDuplicate,
  onDelete,
}: Props) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button
          type="button"
          className="group flex min-w-0 items-center gap-1.5 rounded-md px-1.5 py-1 text-left transition-colors hover:bg-[color:var(--forge-card-hover)]"
          aria-label="Switch build"
        >
          <span className="truncate font-display text-sm font-semibold">
            {activeName}
          </span>
          <ChevronsUpDown className="h-3.5 w-3.5 shrink-0 text-[color:var(--forge-text-muted)]" />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="start"
        side="top"
        className="w-60 border-[color:var(--forge-border)] bg-[color:var(--forge-bg-elevated)]"
      >
        <DropdownMenuLabel className="text-[color:var(--forge-text-muted)]">
          Your builds ({builds.length})
        </DropdownMenuLabel>
        {builds.map((b) => (
          <DropdownMenuItem
            key={b.id}
            onSelect={() => onSwitch(b.id)}
            className="flex items-center justify-between gap-2"
          >
            <span className="truncate">{b.name}</span>
            {b.id === activeId && (
              <Check className="h-4 w-4 shrink-0 text-[color:var(--forge-accent)]" />
            )}
          </DropdownMenuItem>
        ))}
        <DropdownMenuSeparator className="bg-[color:var(--forge-border)]" />
        <DropdownMenuItem onSelect={() => onNew()} className="gap-2">
          <Plus className="h-4 w-4" /> New build
        </DropdownMenuItem>
        <DropdownMenuItem
          onSelect={() => onDuplicate(activeId)}
          className="gap-2"
        >
          <Copy className="h-4 w-4" /> Duplicate this build
        </DropdownMenuItem>
        <DropdownMenuItem
          onSelect={() => onDelete(activeId)}
          disabled={builds.length <= 1}
          className="gap-2 text-[color:var(--forge-danger)] focus:text-[color:var(--forge-danger)]"
        >
          <Trash2 className="h-4 w-4" /> Delete this build
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
