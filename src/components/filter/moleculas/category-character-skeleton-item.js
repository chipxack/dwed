import React from 'react'
import {Title} from "../../../UIComponents/typography";
import {SkeletonUI} from "../../../UIComponents/global-styles";
import {CharacterItem} from "../atoms";

export const CategoryCharacterSkeletonItem = () => {
    return (
        <CharacterItem>
            <Title level={5} weight={500}>
                <SkeletonUI width='80%' variant='text'/>
            </Title>
            <SkeletonUI height={16} width='60%' varinat='text'/>
            <SkeletonUI height={16} width='60%' varinat='text'/>
            <SkeletonUI height={16} width='60%' varinat='text'/>
            <SkeletonUI height={16} width='60%' varinat='text'/>
            <SkeletonUI height={16} width='60%' varinat='text'/>
        </CharacterItem>
    )
}