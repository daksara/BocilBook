"use client";

import { useEffect, useState } from "react";
import { formatRelativeTime } from "@/lib/format";

/**
 * Renders a relative time string, computed only after mount. Relative-time
 * text depends on "now" at render time, which can legitimately differ
 * between the server render and the client hydration pass — computing it
 * client-side only avoids that hydration mismatch entirely.
 */
export function RelativeTime({ iso }: { iso: string }) {
  const [label, setLabel] = useState<string | null>(null);

  useEffect(() => {
    // Intentional: this is the standard hydration-safe pattern for
    // "now"-dependent text — render nothing on the server, then fill in the
    // real value once mounted on the client, where "now" is well-defined.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setLabel(formatRelativeTime(iso));
  }, [iso]);

  return <>{label ?? " "}</>;
}
