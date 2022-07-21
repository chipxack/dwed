import React from 'react'
import {OfficialUser, ShortAccountCardContent, ShortAccountCardImg, ShortAccountCardWrapper} from '../atoms'
import {CommonAvatar} from '../../../UIComponents/avatar'
import {Text, Title} from '../../../UIComponents/typography'
import {truncateString} from '../../../utils/stringUtils'
import {OfficialSvg} from '../../../media'
import {Link} from 'react-router-dom'
import {Tooltip} from 'antd'
import {ShortCardProgress} from '../../progres/organisms/short-card-progress'

export const ShortAccountCard = (
    {
        imgUrl,
        imgSize,
        name,
        text,
        active,
        direction,
        isOfficial,
        path,
        onSelect,
        truncateLength,
        showTooltipTitle,
        rating
    }
) => {

    console.log('rating: ', rating)

    const truncate = truncateLength || 50

    return (
        <ShortAccountCardWrapper direction={direction}>
            {
                imgUrl
                && (
                    <ShortAccountCardImg onClick={onSelect && onSelect}>
                        <CommonAvatar
                            imgUrl={imgUrl}
                            size={imgSize}
                            active={active ? '1' : '0'}
                        />
                        {
                            isOfficial
                            && (
                                <OfficialUser>
                                    <OfficialSvg/>
                                </OfficialUser>
                            )
                        }
                    </ShortAccountCardImg>
                )
            }
            <ShortAccountCardContent>
                <Title>
                    {
                        name
                        && (
                            <>
                                {
                                    path ?
                                        (
                                            <Link to={path}>
                                                {truncateString(name, truncate)}
                                            </Link>
                                        )
                                        : <>
                                            {
                                                showTooltipTitle ?
                                                    <Tooltip title={name}>
                                                        <div>
                                                            {truncateString(name, truncate)}
                                                        </div>
                                                    </Tooltip>
                                                    : truncateString(name, truncate)
                                            }
                                        </>
                                }

                            </>
                        )
                    }
                </Title>
                <Text>
                    {text && truncateString(text, truncate)}
                </Text>
                {
                    rating && <ShortCardProgress rating={rating} />
                }
            </ShortAccountCardContent>
        </ShortAccountCardWrapper>
    )
}