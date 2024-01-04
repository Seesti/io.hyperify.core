// Copyright (c) 2023. Heusala Group Oy <info@hg.fi>. All rights reserved.

import "../../testing/jest/matchers/index";
import { EntityMetadata } from "./types/EntityMetadata";
import { createEntityField, EntityField } from "./types/EntityField";
import { OneToMany } from "./OneToMany";
import { JoinColumn } from "./JoinColumn";
import { EntityFieldType } from "./types/EntityFieldType";
import { ManyToOne } from "./ManyToOne";
import { Table } from "./Table";
import { Entity } from "./Entity";
import { Id } from "./Id";
import { Column } from "./Column";

describe('JoinColumn', () => {

    @Table('carts')
    class CartEntity extends Entity {

        constructor () {
            super();
        }

        @Id()
        @Column('cart_id')
        public cartId ?: string;

        @OneToMany('cart_items', "cart")
        public cartItems ?: readonly CartItemEntity[];

    }

    @Table('cart_items')
    class CartItemEntity extends Entity {

        constructor () {
            super();
        }

        @Id()
        @Column('cart_item_id')
        public cartItemId ?: string;

        @ManyToOne(CartEntity)
        @JoinColumn('cart_id', false)
        public cart ?: CartEntity;

    }

    let entity : CartItemEntity;
    let metadata : EntityMetadata;

    beforeEach(() => {
        entity = new CartItemEntity();
        metadata = entity.getMetadata();
    });

    it('can set fields metadata for cart property', () => {
        const expectedField : EntityField = createEntityField("cart","cart_id", undefined, false, EntityFieldType.JOINED_ENTITY);
        expect(metadata.fields).toBeArray();
        expect(metadata.fields).toContainEqual(expectedField);
    });

});
