"use client";

import { usePokemonImage } from "../hooks/use-pokemon";

/* eslint-disable @next/next/no-img-element */

export function PokemonImage({
  name,
  number,
}: {
  name: string;
  number: number;
}) {
  const imageUrl = usePokemonImage(number);

  if (!imageUrl) {
    return null;
  }

  return <img src={imageUrl} alt={name} />;
}
